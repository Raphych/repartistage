import { useEffect } from "react";

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `${decodeURIComponent(title)}`; return () => { document.title = "APT" }
    }, [])
}