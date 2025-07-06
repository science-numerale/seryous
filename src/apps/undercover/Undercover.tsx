import { Switch } from "solid-js/web";
import { AppProps } from "../apps.ts";
import { setDefaults } from "../utils.tsx";
import { Match } from "solid-js";
import NumberInput from "../../components/NumberInput.tsx";
import { createStore, produce, unwrap } from "solid-js/store";
import { createEffect } from "solid-js";
import TextInput from "../../components/TextInput.tsx";
import { Index } from "solid-js";
import { Show } from "solid-js";
import { createMemo } from "solid-js";
import { keys } from "../../lib/utils.ts";
import { createSignal } from "solid-js";
import Details from "../../components/Details.tsx";
import { For } from "solid-js";
import frenchDb from "./db/french.json" with { type: "json" };
import { ParentProps } from "solid-js";
import { untrack } from "solid-js";
import { Title } from "@solidjs/meta";

const dictionaries = {
  french: frenchDb.map((p) => p.map((s) => s.toLowerCase())),
};

function selectWords(usedWords: string[]) {
  const [banned, setBanned] = createStore(usedWords);
  let dic = dictionaries.french.filter((p) =>
    !banned.includes(p[0]) && !banned.includes(p[1])
  );
  if (dic.length < 5) {
    setBanned([]);
    dic = dictionaries.french.filter((p) =>
      !banned.includes(p[0]) && !banned.includes(p[1])
    );
  }
  const randomIndex = Math.floor(Math.random() * dic.length);
  const choice = [...dic[randomIndex]];
  for (const word of choice) {
    setBanned(banned.length, word);
  }
  return { civilians: choice[0], undercovers: choice[1] };
}

function PlayerDisplay(props: { player: string }) {
  return (
    <Switch fallback={props.player}>
      <Match when={props.player === "signal"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/60/Signal-Logo-Ultramarine_%282024%29.svg"
          height="50"
          style={{
            "vertical-align": "middle",
          }}
        />{" "}
        (quel beau nom)
      </Match>
    </Switch>
  );
}

function areValidSettings(settings: Settings) {
  const repartition = settings.roles;
  if (repartition.civilians < 1) {
    return "Il y a trop peu de civils";
  }
  if (repartition.undercovers < 1) {
    return "Il y a trop peu d'undercovers";
  }
  const thePlayers = [] as string[];
  for (let i = 0; i < settings.players.length; i++) {
    const player = settings.players[i];
    if (player === "") {
      return `Le joueur ${i + 1} n'a pas de nom (le pauvre)`;
    }
    if (thePlayers.includes(player)) {
      return `Le joueur ${
        i + 1
      } a copié le nom de quelqu'un (j'aurais pas aimé)`;
    }
    thePlayers.push(player);
  }
  return true as true;
}

function start(settings: Settings, usedWords: string[]) {
  if (areValidSettings(settings) === true) {
    const myPlayers = [...unwrap(settings).players];
    const [game, setGame] = createStore<Game>({
      casting: Object.fromEntries(
        myPlayers.map((player) => [player, ""]),
      ) as unknown as Record<
        string,
        Role
      >,
      words: selectWords(usedWords),
      deads: [],
    });
    for (const role of keys(settings.roles)) {
      for (let i = 0; i < settings.roles[role]; i++) {
        const idx = Math.floor(Math.random() * myPlayers.length);
        setGame(
          "casting",
          myPlayers.splice(idx, 1)[0],
          role,
        );
      }
    }
    return game;
  }
}

function Init(props: { settings: Settings; setGame: () => void }) {
  const [settings, setSettings] = createStore(props.settings);

  const desiredPlayerCount = createMemo(() =>
    Object.values(settings.roles).reduce((acc, val) => acc + val, 0)
  );

  createEffect(() => {
    const desiredCount = desiredPlayerCount();
    const actualCount = settings.players.length;
    if (actualCount < desiredCount) {
      const diff = desiredCount - actualCount;
      setSettings(
        "players",
        produce((a) => a.push(...Array(diff).fill(""))),
      );
    } else if (actualCount > desiredCount) {
      setSettings(
        "players",
        produce((p) => {
          p.length = desiredCount;
        }),
      );
    }
  });

  const canPressNext = createMemo(() => areValidSettings(settings));

  function DistributionSelector(
    props: { role: keyof typeof settings.roles; label: string },
  ) {
    return (
      <>
        <NumberInput
          label={props.label}
          value={settings.roles[props.role]}
          setValue={(v) => setSettings("roles", props.role, v)}
          min={0}
        />
        <br />
      </>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.setGame();
      }}
    >
      <DistributionSelector role="civilians" label="Nombre de civils" />
      <DistributionSelector
        role="undercovers"
        label="Nombre d'undercovers"
      />
      <DistributionSelector
        role="whiteman"
        label="Nombre de Mr. White"
      />
      <br />
      <strong>{desiredPlayerCount()} joueurs :</strong>{" "}
      <Switch>
        <Match when={desiredPlayerCount() < 4}>(ça va être nul)</Match>
        <Match when={desiredPlayerCount() > 20}>(tu forces)</Match>
      </Switch>
      <ol>
        <Index each={settings.players}>
          {(player, i) => (
            <li>
              <TextInput
                value={player()}
                setValue={(player) => setSettings("players", i, player)}
                placeholder={`Nom du joueur ${i + 1}`}
              />
            </li>
          )}
        </Index>
      </ol>
      <button
        type="submit"
        disabled={canPressNext() !== true}
      >
        Démarer la partie
      </button>{" "}
      <Show when={canPressNext() !== true}>
        <strong style={{ color: "red" }}>{canPressNext()}</strong>
        <br />
      </Show>
    </form>
  );
}

function ConfidentialSpace(props: { game: Game }) {
  const [selectedPlayer, setSelectedPlayer] = createSignal("");
  const role = () => props.game.casting[selectedPlayer()];
  const [certified, setCertified] = createSignal(false);
  const players = createMemo(() => keys(props.game.casting));
  const [timer, setTimer] = createSignal(-1);

  // FIXME: Imperfect
  setInterval(() => {
    setTimer(timer() - 1);
    if (timer() === 0) reset();
  }, 1000);

  function reset() {
    setSelectedPlayer("");
    setCertified(false);
    setTimer(-1);
  }

  createEffect(() => {
    if (certified()) setTimer(5);
  });

  return (
    <Show
      when={certified()}
      fallback={
        <>
          <form onSubmit={() => setCertified(true)}>
            <TextInput
              value={selectedPlayer()}
              setValue={setSelectedPlayer}
              placeholder="Ton nom ici"
            />{" "}
            <Show
              when={players().includes(selectedPlayer())}
              fallback="Quel est ton joli nom ?"
            >
              <button type="submit">
                Je certifie être <PlayerDisplay player={selectedPlayer()} />
              </button>
            </Show>
          </form>
        </>
      }
    >
      <Show
        when={role() !== undefined}
        fallback={`Hmmm... le joueur ${selectedPlayer()} n'existe pas...`}
      >
        <Switch>
          <Match
            when={role() !== "whiteman"}
          >
            Ton mot secret est "
            <strong>
              {props.game
                .words[role() as "civilians" | "undercovers"]}
            </strong>"
          </Match>
          <Match
            when={role() === "whiteman"}
          >
            Tu est <strong>{displayRole(role())}</strong> (désolé ¯\_(ツ)_/¯)
          </Match>
        </Switch>
        <br />

        <Show when={props.game.deads.includes(selectedPlayer())}>
          PS : t'es <strong>MORT</strong>
          <br />
        </Show>

        Ce message s'autodétruira dans {timer()}{" "}
        seconde<Show when={timer() > 1}>s</Show>.
      </Show>
    </Show>
  );
}

function GameDashboard(props: { game: Game; end: () => void }) {
  const [game, setGame] = createStore(props.game);
  const players = createMemo(() => keys(game.casting));
  const [quiting, setQuiting] = createSignal(0);
  const [quitingId, setQuitingId] = createSignal<number | undefined>(undefined);

  createEffect(() => {
    quiting();
    untrack(() => {
      clearTimeout(quitingId());
      setQuitingId(setTimeout(() => setQuiting(0), 3000));
    });
  });

  function QuitStep(
    thisProps: ParentProps<{ step: number; final?: boolean }>,
  ) {
    return (
      <Match when={quiting() === thisProps.step}>
        <button
          type="button"
          onClick={() => {
            if (thisProps.final) props.end();
            else setQuiting(thisProps.step + 1);
          }}
        >
          {thisProps.children}
        </button>
      </Match>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          "align-items": "flex-start",
          gap: "1rem",
        }}
      >
        <div class="box">
          <strong>Joueurs :</strong>
          <ul>
            <For each={players()}>
              {(player) => (
                <li>
                  <PlayerDisplay player={player} />
                  <Show
                    when={game.deads.includes(player)}
                    fallback={
                      <>
                        {" "}
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              confirm(`Vous voulez vraiment tuer ${player} ?`)
                            ) {
                              setGame("deads", game.deads.length, player);
                              if (game.casting[player] === "whiteman") {
                                const guess = prompt(
                                  `${player}, tu es Mr. White, et tu as le droit d'essayer de deviner le mot des CIVILS pour gagner. Saisis le mot secret ici :`,
                                );
                                if (guess === null) {
                                  alert("...");
                                } else if (
                                  guess.toLowerCase() === game.words.civilians
                                ) {
                                  alert(
                                    "Oui, bravo. C'était facile en même temps...",
                                  );
                                } else {
                                  alert("non.");
                                }
                              }
                            } else alert("Ok, ouf !");
                          }}
                        >
                          Tuer
                        </button>
                      </>
                    }
                  >
                    {" : "}
                    <strong>{displayRole(game.casting[player])}</strong> (mort)
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>

        <div class="box">
          <strong>Il reste :</strong>
          <ul>
            <For
              each={[
                ...(new Set(
                  Object.values(game.casting),
                ) as unknown as Role[]),
              ]}
            >
              {(role) => {
                const all =
                  Object.values(game.casting).filter((v) => v === role)
                    .length;
                const alive =
                  Object.entries(game.casting).filter(([k, v]) =>
                    v === role && !game.deads.includes(k)
                  ).length;
                return (
                  <li>
                    <strong>{alive}</strong>/{all} {displayRole(role, all > 1)}
                  </li>
                );
              }}
            </For>
          </ul>
        </div>
      </div>
      <br />
      <Details summary="Espace confidentiel">
        <div class="box" style={{ width: "fit-content" }}>
          <ConfidentialSpace game={game} />
        </div>
      </Details>
      <br />
      <Switch>
        <QuitStep step={0}>Quitter la partie</QuitStep>
        <QuitStep step={1}>Quitter la partie (c'est domage)</QuitStep>
        <QuitStep step={2}>
          Quitter la partie (c'est domage) (et irréversible)
        </QuitStep>
        <QuitStep step={3}>
          Quitter la partie (c'est domage) (et irréversible) (et pas sympa)
        </QuitStep>
        <QuitStep step={4} final>
          Quitter la partie (je t'aurai prévenu)
        </QuitStep>
      </Switch>
    </>
  );
}

function displayRole(role: Role, plural: boolean = false) {
  if (plural) {
    return {
      civilians: "civils",
      undercovers: "undercovers",
      whiteman: "Mr. White",
    }[role];
  }
  return {
    civilians: "civil",
    undercovers: "undercover",
    whiteman: "Mr. White",
  }[role];
}

// const defaultGame = () => ({
//   stage: "init",
//   casting: {},
//   words: {
//     civilians: "",
//     undercovers: "",
//   },
//   deads: [],
// } as Game);

// function resetGame(game: Game) {
//   const [_, setGame] = createStore(game);
//   setGame(defaultGame());
// }

type Role = keyof Storage["settings"]["roles"];

interface Game {
  casting: Record<string, Role>;
  words: {
    civilians: string;
    undercovers: string;
  };
  deads: string[];
  winner?: string;
}

interface Settings {
  roles: {
    civilians: number;
    undercovers: number;
    whiteman: number;
  };
  players: string[];
}

interface Storage {
  game?: Game;
  settings: Settings;
  usedWords: string[];
}

export default function Undercover(props: AppProps) {
  const [storage, setStorage] = setDefaults<Storage>(props.storage, {
    settings: {
      roles: {
        civilians: 3,
        undercovers: 2,
        whiteman: 1,
      },
      players: Array(6).fill(""),
    },
    usedWords: [],
  });

  return (
    <>
      <Title>Undercover</Title>
      <h1>Undercover</h1>
      <Show
        when={storage.game !== undefined}
        fallback={
          <>
            <h2>Configuration de la partie</h2>
            <Init
              settings={storage.settings}
              setGame={() => {
                const game = start(storage.settings, storage.usedWords);
                if (game !== undefined) {
                  setStorage("game", game);
                }
              }}
            />
          </>
        }
      >
        <h2>Tableau de bord de la partie</h2>
        <GameDashboard
          game={storage.game!}
          end={() => setStorage("game", undefined)}
        />
      </Show>
    </>
  );
}
