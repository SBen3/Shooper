"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  console.log(onOpen,isOpen)
  return <div className="m-2">Root Page</div>;
};
export default Home