import { useNavigate, useLocation } from "react-router";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (itemName, targetPath) => {
    if (itemName === "Resources") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById("resources")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document
          .getElementById("resources")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (itemName === "Contact") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(targetPath);
    }
  };

  return (
    <footer className="bg-[#111111] text-gray-400 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold tracking-tight mb-3">
              318 Bible Church
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Seeing and Savoring Jesus Christ, serving one another in love, and sharing His gospel with the world.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("About", "/about")} 
                  className="hover:text-[#7bb0e0] transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("Expect", "/expect")} 
                  className="hover:text-[#7bb0e0] transition-colors text-left cursor-pointer"
                >
                  What To Expect
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("Kids", "/kids")} 
                  className="hover:text-[#7bb0e0] transition-colors text-left cursor-pointer"
                >
                  Kids Ministry
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("Resources")} 
                  className="hover:text-[#7bb0e0] transition-colors text-left cursor-pointer"
                >
                  Downloads & Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("Resources")} 
                  className="hover:text-[#7bb0e0] transition-colors text-left cursor-pointer"
                >
                  Live Stream Access
                </button>
              </li>
            </ul>
          </div>

          {/* Service Times Column */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
              Sundays
            </h4>
            <p className="text-sm mb-1 text-gray-300 font-medium">Service: 10:30 AM</p>
            <p className="text-sm mb-3 text-gray-300 font-medium">Fellowship Meal: 12:00 PM</p>
            <p className="text-xs text-gray-500">
              Meeting weekly. All are welcome to join us.
            </p>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} 318 Bible Church. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <button 
              onClick={() => handleNavigation("Contact")} 
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}