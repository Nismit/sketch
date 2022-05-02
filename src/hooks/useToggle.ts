import { useState, useCallback } from "preact/hooks";

export const useToggle = (initState?: boolean) => {
  const [toggle, setToggle] = useState(initState ?? false);
  const changeToggle = useCallback(
    (state: boolean) => setToggle(state),
    [toggle]
  );

  return { toggle, changeToggle };
};
