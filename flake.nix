{
  description = "Le flake Nix de serYous";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
		flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
	{ self, nixpkgs, flake-utils }:
		flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShellNoCC {
					
          packages = with pkgs; [
						# nodejs
						deno
						bashInteractive # https://discourse.nixos.org/t/interactive-bash-with-nix-develop-flake/15486
          ];

          shellHook = ''
						export SHELL=${pkgs.lib.getExe pkgs.bashInteractive}
            echo "Bonjour, vous êtes bien dans l'environnement de développement sérieux."
          '';
        };
      }
    );
}
