export default function(r, g, b) {
  const RED = Number(r).toString(16);
  const GREEN = Number(g).toString(16);
  const BLUE = Number(b).toString(16);

  return `#${RED.length !== 2 ? `${RED}${RED}` : RED}${
    GREEN.length !== 2 ? `${GREEN}${GREEN}` : GREEN
  }${BLUE.length !== 2 ? `${BLUE}${BLUE}` : BLUE}`;
}
