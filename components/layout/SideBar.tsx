import Link from "next/link";
import { SidebarNav } from "./SidebarNav";
import {
  BE_LIKE_WATER_RATIO,
  SIGNATURE_RATIO,
  SketchIcon,
} from "../ui/SketchIcon";

// Server component: the name header is static; only the nav needs the client
// (pathname active state, hover tooltips, dice spin).
export function Sidebar() {
  return (
    <>
      {/* Name section */}
      <div className="flex flex-col items-center mb-2 lg:fixed lg:top-10 lg:left-10 lg:mb-2">
        <div className="font-bold text-center lg:text-left mt-4 mb-2 lg:mt-0">
          <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2">
            <Link href="/" className="w-40 lg:w-44">
              <SketchIcon
                src="/icons/varun_goyal_signature.svg"
                label="Varun Goyal"
                className="w-full"
                style={{ aspectRatio: SIGNATURE_RATIO }}
              />
            </Link>
            <SketchIcon
              src="/icons/be-like-water.svg"
              label="Be like water"
              className="w-32 lg:w-36"
              style={{ aspectRatio: BE_LIKE_WATER_RATIO }}
            />
          </div>
        </div>
      </div>

      <SidebarNav />
    </>
  );
}
