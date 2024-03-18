import { CloudSun } from "@phosphor-icons/react";
import { ThemeToggle } from "./theme/theme-toogle";
import { Separator } from "@radix-ui/react-separator";

export function Header() {
    return (
        <div className="border-b w-full">
            <div className="flex h-16 items-center gap-6 px-6">
                <CloudSun size={32} />
                <Separator orientation="vertical" className="h-8 border" />
                <h2 className="font-bold text-xl">Jr.Clima</h2>
                <div className="ml-auto flex items-center gap-3">
                    <ThemeToggle />
                </div>
            </div>
      </div>
    )
}