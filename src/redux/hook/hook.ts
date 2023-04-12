import { useDispatch } from "react-redux";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
import { AppDispatch } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
