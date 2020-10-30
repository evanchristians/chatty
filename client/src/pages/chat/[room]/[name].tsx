import { Flex, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Container } from "../../../components/Container";
import { ENDPOINT } from "../../../constants";

const Chat = () => {
  console.log("did I actually get here");
  const router = useRouter();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = io(ENDPOINT);
  console.log(socket);
  useEffect(() => {
    const { room, name } = router.query;
    setRoom(typeof room === "string" ? room : "");
    setName(typeof name === "string" ? name : "");

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");

      socket.off("disconnect")
    };
  }, [ENDPOINT, router.query]);
  return (
    <Container>
      <Flex flexDir="column">
        <Text>Name: {name}</Text>
        <Text>Room: {room}</Text>
      </Flex>
    </Container>
  );
};

export default Chat;
