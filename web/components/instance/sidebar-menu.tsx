import Link from "next/link";
import { useRouter } from "next/router";
// icons
import { Image, BrainCog, Cog, Lock, Mail } from "lucide-react";
// mobx store
import { useMobxStore } from "lib/mobx/store-provider";
// ui
import { Tooltip } from "@plane/ui";

const INSTANCE_ADMIN_LINKS = [
  {
    Icon: Cog,
    name: "General",
    description: "Identify your instances and get key details",
    href: `/god-mode`,
  },
  {
    Icon: Mail,
    name: "Mail",
    description: "Set up emails to your users",
    href: `/god-mode/mail`,
  },
  {
    Icon: Lock,
    name: "SSO and OAuth",
    description: "Configure your Google and GitHub SSOs",
    href: `/god-mode/authorization`,
  },
  {
    Icon: BrainCog,
    name: "OpenAI",
    description: "Configure your OpenAI creds",
    href: `/god-mode/ai`,
  },
  {
    Icon: Image,
    name: "Images in Plane",
    description: "Allow third-party image libraries",
    href: `/god-mode/image`,
  },
];

export const InstanceAdminSidebarMenu = () => {
  const {
    theme: { sidebarCollapsed },
  } = useMobxStore();
  // router
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2.5 py-6 px-4 h-full w-full overflow-y-auto">
      {INSTANCE_ADMIN_LINKS.map((item, index) => {
        const isActive = item.name === "Settings" ? router.asPath.includes(item.href) : router.asPath === item.href;

        return (
          <Link key={index} href={item.href}>
            <a className="block w-full">
              <Tooltip tooltipContent={item.name} position="right" className="ml-2" disabled={!sidebarCollapsed}>
                <div
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 outline-none ${
                    isActive
                      ? "bg-custom-primary-100/10 text-custom-primary-100"
                      : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  {<item.Icon className="h-4 w-4" />}
                  {!sidebarCollapsed && (
                    <div className="flex flex-col leading-snug">
                      <span
                        className={`text-sm font-medium ${
                          isActive ? "text-custom-primary-100" : "text-custom-sidebar-text-200"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] ${
                          isActive ? "text-custom-primary-90" : "text-custom-sidebar-text-400"
                        }`}
                      >
                        {item.description}
                      </span>
                    </div>
                  )}
                </div>
              </Tooltip>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
