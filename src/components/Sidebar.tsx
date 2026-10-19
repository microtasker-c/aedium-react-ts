import { GearIcon, HouseLineIcon, NotePencilIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import {
  SignedIn
} from '@neondatabase/neon-js/auth/react';


function Sidebar() {

  const navigate = useNavigate()

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}

          {/* Write */}
          <SignedIn>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right sidebar-primary-item"
                data-tip="Write"
                onClick={() => navigate({
                  to: '/editor'
                })}
              >
                <NotePencilIcon size={24} />

                <span className="is-drawer-close:hidden">Write</span>
              </button>
            </li>
          </SignedIn>



          <li>
            {/* Home icon */}
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
              onClick={
                () => navigate({
                  to: '/'
                })
              }
            >
              <HouseLineIcon size={24} />

              <span className="is-drawer-close:hidden">Homepage</span>
            </button>
          </li>

          {/* List item */}
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Settings"
            >
              {/* Settings icon */}
              <GearIcon size={24} />
              <span className="is-drawer-close:hidden">Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div >
  );
}

export default Sidebar;