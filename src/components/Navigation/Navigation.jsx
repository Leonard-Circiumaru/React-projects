import "./styles.css";
import { NavButton } from "./NavButton/NavButton";

export const Navigation = () => {
   return (
   <div className="header-navigation">
       <NavButton label="Counter" path="/counter" />
       <NavButton label="ToDo" path="/todo" />
       <NavButton label="DigitalClock" path="/digital_clock" />
       </div>
   );
};