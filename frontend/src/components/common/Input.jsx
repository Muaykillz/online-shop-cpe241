import React from "react";
const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border rounded px-3 py-2 focus:outline-none focus:ring ${className}`}
    {...props}
  />
));
export default Input;