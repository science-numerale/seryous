{
  description = "F";

  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };

  outputs = { nixpkgs, ... }: {
    devShells = nixpkgs.lib.attrsets.genAttrs [ "x86_64-linux" "aarch64-linux" ]
      (system: {
        default = let pkgs = import nixpkgs { inherit system; };
        in pkgs.mkShell { packages = with pkgs; [ deno pnpm nodejs ]; };
      });
  };
}
