import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { finishGame } from "../gamesSlice";
import { uploadScore } from "../gamesAPI";

export function useUploadOnDismount() {
  let dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(finishGame());
      dispatch(uploadScore());
    };
  }, [dispatch]);
}
