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
import frenchTestDb from "./db/french-test.json" with { type: "json" };
import { ParentProps } from "solid-js";
import { untrack } from "solid-js";
import { Title } from "@solidjs/meta";
import Select from "../../components/Select.tsx";
import { Accessor } from "solid-js";
import { onCleanup } from "solid-js";

const dictionaries = {
  french: (import.meta.env.DEV ? frenchTestDb : frenchDb).map((p) =>
    p.map((s) => s.toLowerCase())
  ),
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
  const playerCount = Object.values(settings.roles).reduce(
    (acc, val) => acc + val,
    0,
  );
  if (repartition.civilians < 1) {
    return "Il y a trop peu de civils";
  }
  if (repartition.undercovers < 1) {
    return "Il y a trop peu d'undercovers";
  }
  const thePlayers = [] as string[];

  for (let i = 0; i < playerCount; i++) {
    const player = settings.players[i.toString() as unknown as number];
    if ((player ?? "") === "") {
      return `Le joueur ${i + 1} n'a pas de nom (le pauvre)`;
    } else if (thePlayers.includes(player)) {
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
    const playerCount = Object.values(settings.roles).reduce(
      (acc, val) => acc + val,
      0,
    );
    const myPlayers = [...Array(playerCount)].map((_, i) =>
      settings.players[i]
    );
    const [game, setGame] = createStore<Game>({
      casting: Object.fromEntries(
        myPlayers.map((player) => [player, ""]),
      ) as unknown as Record<
        string,
        Role
      >,
      words: selectWords(usedWords),
      guesses: {},
      deads: [],
      startingPlayer: "",
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

    const allExceptWhiteman = keys(game.casting).filter((p) =>
      game.casting[p] !== "whiteman"
    );
    setGame(
      "startingPlayer",
      allExceptWhiteman[Math.floor(Math.random() * allExceptWhiteman.length)],
    );

    return game;
  }
}

function Init(props: { settings: Settings; start: () => void }) {
  const [settings, setSettings] = createStore(props.settings);

  const desiredPlayerCount = createMemo(() =>
    Object.values(settings.roles).reduce((acc, val) => acc + val, 0)
  );

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
        props.start();
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
        <Index each={new Array(desiredPlayerCount())}>
          {(_, i) => (
            <li>
              <TextInput
                value={settings.players[i] ?? ""}
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
  const [selectedPlayer, setSelectedPlayer] = createSignal<string | undefined>(
    undefined,
  );
  const role = () =>
    selectedPlayer() === undefined
      ? undefined
      : props.game.casting[selectedPlayer()!];
  const [certified, setCertified] = createSignal(false);
  const players = createMemo(() => keys(props.game.casting));
  const [timer, setTimer] = createSignal(-1);

  // FIXME: Imperfect
  const intervalId = setInterval(() => {
    setTimer(timer() - 1);
    if (timer() === 0) reset();
  }, 1000);
  onCleanup(() => clearInterval(intervalId));

  function reset() {
    setSelectedPlayer(undefined);
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
            <Select
              value={selectedPlayer()}
              setValue={(v: string | undefined) => setSelectedPlayer(v)}
              choices={players().reduce((acc, val) => {
                acc[val] = val;
                return acc;
              }, {} as Record<string, string>)}
              placeHolder="Choisis ton nom"
            />{" "}
            <Show
              when={players().includes(selectedPlayer() ?? "")}
            >
              <button type="submit">
                Je certifie être <PlayerDisplay player={selectedPlayer()!} />
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
            Tu est <strong>{displayRole(role()!)}</strong> (désolé ¯\_(ツ)_/¯)
          </Match>
        </Switch>
        <br />

        <Show when={props.game.deads.includes(selectedPlayer()!)}>
          PS : t'es <strong>MORT</strong>
          <br />
        </Show>

        Ce message s'autodétruira dans {timer()}{" "}
        seconde<Show when={timer() > 1}>s</Show>.
      </Show>
    </Show>
  );
}

function GameDashboard(props: { game: Game; forceQuit: () => void }) {
  const [game, setGame] = createStore(props.game);
  const round = () => game.deads.length;
  const roles = createMemo(() => (new Set(
    Object.values(game.casting),
  ) as unknown as Role[]));

  const players = createMemo(() => keys(game.casting));
  const alivePlayers = createMemo(() =>
    players().filter((p) => !game.deads.includes(p))
  );

  const playersByRoles = {} as unknown as Record<Role, Accessor<string[]>>;
  const alivePlayersByRoles = {} as unknown as Record<Role, Accessor<string[]>>;

  for (
    const role of roles()
  ) {
    playersByRoles[role] = createMemo(() =>
      players().filter((p) => game.casting[p] === role)
    );
    alivePlayersByRoles[role] = createMemo(() =>
      alivePlayers().filter((p) => game.casting[p] === role)
    );
  }

  const [quitingStep, setQuitingStep] = createSignal(0);

  // Timer setup
  createEffect(() => {
    quitingStep();
    const id = setTimeout(() => setQuitingStep(0), 3000);
    onCleanup(() => clearTimeout(id));
  });

  createEffect(() => {
    const c = { // Stands for "count"
      total: alivePlayers().length,

      c: alivePlayersByRoles.civilians().length,
      u: alivePlayersByRoles.undercovers().length,
      w: alivePlayersByRoles.whiteman().length,
    };

    if (c.total <= 1) {
      setGame({
        end: {
          winners: alivePlayers(),
          explanation: c.total === 0
            ? "Il ne reste aucun joueur"
            : "Il n'y a plus que 1 survivant",
        },
      });
    } else if (c.total <= 2) {
      if (c.w > 0) {
        setGame({
          end: {
            winners: alivePlayersByRoles.whiteman(),
            explanation: `Il reste ${
              displayRoleCount(c.w, "whiteman")
            } pour seulement ${displayRoleCount(c.c, "civilians")}`,
          },
        });
      } else if (c.u > 0) {
        setGame({
          end: {
            winners: alivePlayersByRoles.undercovers(),
            explanation: `Il reste ${
              displayRoleCount(c.u, "undercovers")
            } pour seulement ${displayRoleCount(c.c, "civilians")}`,
          },
        });
      } else {setGame({
          end: {
            winners: alivePlayersByRoles.civilians(),
            explanation: "Il ne reste que des civils",
          },
        });}
    }
  });

  function killPlayer(player: string) {
    if (game.casting[player] === "whiteman") {
      const guess = prompt(
        `${player}, tu es Mr. White, et tu as le droit d'essayer de deviner le mot des CIVILS pour gagner. Saisis le mot secret ici :`,
      );
      if (guess === null) {
        alert("...");
        setGame("deads", game.deads.length, player);
      } else {
        setGame("guesses", player, guess);
        if (
          guess.toLowerCase() === game.words.civilians
        ) {
          alert(
            "Oui, bravo. C'était facile en même temps...",
          );
          setGame({
            end: {
              winners: [player],
              explanation:
                `${player} (Mr. White) est mort mais a trouvé le mot secret`,
            },
          });
        } else {
          alert("non.");
          setGame("deads", game.deads.length, player);
        }
      }
    } else {
      setGame("deads", game.deads.length, player);
    }

    setGame(
      "startingPlayer",
      alivePlayers()[Math.floor(Math.random() * alivePlayers().length)],
    );
  }

  function QuitStep(
    thisProps: ParentProps<{ step: number; final?: boolean }>,
  ) {
    return (
      <Match when={quitingStep() === thisProps.step}>
        <button
          type="button"
          onClick={() => {
            if (thisProps.final) props.forceQuit();
            else setQuitingStep(thisProps.step + 1);
          }}
        >
          {thisProps.children}
        </button>
      </Match>
    );
  }

  return (
    <>
      <strong>
        Tour {round() + 1} : <PlayerDisplay player={game.startingPlayer} />{" "}
        commence
      </strong>
      <br />
      <small>Tuez quelqu'un pour passer au tour suivant</small>
      <br />
      <br />
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
                              killPlayer(player);
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
                return (
                  <li>
                    <strong>{alivePlayersByRoles[role]().length}
                    </strong>/{displayRoleCount(
                      playersByRoles[role]().length,
                      role,
                    )}
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

function GameOverview(props: { game: Game; quit: () => void }) {
  const [game] = createStore(props.game);
  const roleOrder: Record<Role, number> = {
    civilians: 0,
    undercovers: 1,
    whiteman: 2,
  };
  const orderedPlayers = createMemo(() =>
    keys(game.casting).sort((a, b) =>
      roleOrder[game.casting[a]] - roleOrder[game.casting[b]]
    )
  );

  return (
    <>
      <Show
        when={game.end !== undefined}
        fallback="La partie a été quittée en cours de route."
      >
        La partie est finie.
        <br />
        {/* FIXME: Well... no */}
        Les{" "}
        <strong>{displayRole(game.casting[game.end!.winners[0]], true)}</strong>
        {" "}
        ont gagné.
      </Show>
      <br />
      <br />

      Mot des civils : <strong>{game.words.civilians}</strong>
      <br />
      Mot des undercovers : <strong>{game.words.undercovers}</strong>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Rôle</th>
            <th scope="col">Mot</th>
            <th scope="col">En vie</th>
          </tr>
        </thead>
        <tbody>
          <For each={orderedPlayers()}>
            {(player) => {
              const colors = ({ // [bg, fg]
                civilians: ["lightblue", "black"],
                undercovers: ["lightcoral", "black"],
                whiteman: ["white", "black"],
              } satisfies Record<Role, [string, string]>)[game.casting[player]];

              return (
                <tr style={{ background: colors[0], color: colors[1] }}>
                  <th scope="row">
                    <PlayerDisplay player={player} />
                  </th>
                  <td>{displayRole(game.casting[player])}</td>
                  <td>
                    {(game.words as Record<Role, string>)[
                      game.casting[player]
                    ] ??
                      (game.guesses[player] === undefined
                        ? "-"
                        : `mot deviné : ${game.guesses[player]}`)}
                  </td>
                  <td
                    style={{
                      "text-align": "center",
                      background: game.deads.includes(player)
                        ? "grey"
                        : "white",
                    }}
                  >
                    {game.deads.includes(player) ? "non" : "oui"}
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <br />
      <button type="button" onClick={props.quit}>Quitter</button>
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

function displayRoleCount(count: number, role: Role) {
  return `${count} ${displayRole(role, count > 1)}`;
}

type Role = keyof Storage["settings"]["roles"];

interface Game {
  casting: Record<string, Role>;
  words: {
    civilians: string;
    undercovers: string;
  };
  guesses: Record<string, string>;
  deads: string[];
  startingPlayer: string;
  end?: {
    winners: string[];
    explanation: string;
  };
}

interface Settings {
  roles: {
    civilians: number;
    undercovers: number;
    whiteman: number;
  };
  players: Record<number, string>;
}

interface Storage {
  game?: Game;
  settings: Settings;
  usedWords: string[];
  overview: boolean;
}

export default function Undercover(props: AppProps) {
  const [storage, setStorage] = setDefaults<Storage>(props.storage, {
    settings: {
      roles: {
        civilians: 3,
        undercovers: 2,
        whiteman: 1,
      },
      players: {},
    },
    usedWords: [],
    overview: false,
  });

  createEffect(() => {
    if (storage.game?.end !== undefined) setStorage("overview", true);
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
              start={() => {
                const game = start(storage.settings, storage.usedWords);
                setStorage("overview", false);
                if (game !== undefined) {
                  setStorage("game", game);
                }
              }}
            />
          </>
        }
      >
        <Show
          when={storage.overview}
          fallback={
            <>
              <h2>Tableau de bord de la partie</h2>
              <GameDashboard
                game={storage.game!}
                forceQuit={() => setStorage("overview", true)}
              />
            </>
          }
        >
          <h2>Résumé de la partie</h2>
          <GameOverview
            game={unwrap(storage.game!)}
            quit={() => {
              console.log("test");
              setStorage("game", undefined);
            }}
          />
        </Show>
      </Show>
    </>
  );
}
