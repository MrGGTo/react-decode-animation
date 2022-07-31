import { useEffect, useState } from "react";

export default function useOnScreen(ref: any) {
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
}
