import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { finishGame, uploadScore } from "../gamesSlice";

export function useUploadOnDismount() {
  let dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(finishGame());
      dispatch(uploadScore());
    };
  }, [dispatch]);
}
