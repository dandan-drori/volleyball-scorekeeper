import { createReducer } from "@reduxjs/toolkit";
import RotemImg from "../../assets/images/rotem.jpeg";
import EdenImg from "../../assets/images/eden.jpeg";
import DandanImg from "../../assets/images/dandan.jpeg";
import { SET_PLAYERS_STATUS } from "../actions/actionConstants";

export const playersReducer = createReducer([
    {
        img: RotemImg,
        name: 'רותם ספיבק',
        number: '10',
        isSelected: false
    },
    {
        img: EdenImg,
        name: 'עדן אליאל',
        number: '9',
        isSelected: false
    },
    {
        img: DandanImg,
        name: 'דנדן דרורי',
        number: '7',
        isSelected: false
    },
], (builder) => {
    builder
        .addCase(SET_PLAYERS_STATUS, (state, {payload}) => {
            const { playersStatus } = payload;
            state = playersStatus;
            console.log(state);
        })
});
