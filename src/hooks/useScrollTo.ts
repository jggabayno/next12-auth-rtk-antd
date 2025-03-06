import { useEffect, useRef, useState } from "react";

const useScrollTo = <T extends Element>() => {
    const ref = useRef<T>(null);
    const [shouldScrollTo, setShouldScrollTo] = useState(false);
  
    useEffect(() => {
      if (ref.current && shouldScrollTo) {
        ref.current!.scrollIntoView({ behavior: 'smooth' });
        setShouldScrollTo(false);
      }
    }, [shouldScrollTo]);
  
    return [ref, setShouldScrollTo];
  };

export default useScrollTo
  