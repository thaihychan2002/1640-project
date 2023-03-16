import { useMediaQuery } from "@material-ui/core";
function Responsive() {
  const isMd = useMediaQuery("(max-width: 900px)");
  const isXs = useMediaQuery("(max-width: 500px)");

  return { isMd, isXs };
}
export default Responsive;
