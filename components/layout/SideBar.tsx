import Link from "next/link";
import { SidebarNav } from "./SidebarNav";
import { SketchIcon, SIGNATURE_RATIO } from "../ui/SketchIcon";

// Server component: the name header is static; only the nav needs the client
// (pathname active state, hover tooltips, dice spin).
export function Sidebar() {
  return (
    <>
      {/* Name section */}
      <div className="flex flex-col items-center mb-2 lg:fixed lg:top-10 lg:left-10 lg:mb-2">
        <div className="font-bold text-center lg:text-left mt-4 mb-2 lg:mt-0">
          <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-2">
            <Link href="/" className="w-40 lg:w-44">
              <SketchIcon
                src="/icons/varun_goyal_signature.svg"
                label="Varun Goyal"
                className="w-full"
                style={{ aspectRatio: SIGNATURE_RATIO }}
              />
            </Link>
          </div>
        </div>
      </div>

      <SidebarNav />
    </>
  );
}
