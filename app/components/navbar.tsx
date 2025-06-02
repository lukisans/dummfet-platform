import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { formatAddress } from "~/lib/utils";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, chains } = useSwitchChain();

  const connector = connectors[0];

  return (
    <nav className="w-full justify-between items-center flex h-fit pb-2 mb-2 border-b border-gray-300">
      <h1 className="scroll-m-20 text-center text-2xl px-3 py-1 bg-orange-700 text-white flex items-center rounded-full justify-center tracking-wide text-balance">
        D<span className="sr-only">Dummfet</span>
      </h1>
      {isConnected ? (
        <div className="flex-col md:flex-row flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white h-fit p-2 rounded-2xl font-semibold flex justify-center items-center gap-1">
              {chain?.name.split(" ").slice(0, 2).join(" ")} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full justify-center rounded-2xl">
              {chains.map(
                (c) =>
                  c.id !== chain?.id && (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => switchChain({ chainId: c.id })}
                      className="cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
                    >
                      {c.name}
                    </DropdownMenuItem>
                  ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white h-fit p-2 rounded-2xl font-semibold flex justify-center items-center gap-1">
              {formatAddress(address)} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full justify-center rounded-2xl">
              <DropdownMenuItem
                onClick={() => disconnect()}
                className="text-red-400 cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          className="bg-blue-500 rounded-md hover:bg-blue-600 shadow-md md:px-10 font-semibold relative flex items-center justify-center w-48"
          size="lg"
          onClick={() => connect({ connector })}
          disabled={status === "pending"}
          aria-busy={status === "pending"}
          aria-live="polite"
        >
          {status === "pending" ? (
            <>
              <svg
                className="w-5 h-5 animate-spin mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                role="status"
                aria-hidden="true"
              >
                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
              </svg>
              <span className="sr-only">Connecting...</span>
            </>
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
      )}
    </nav>
  );
}
