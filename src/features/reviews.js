import { createAction, createReducer } from "@reduxjs/toolkit";

const fetchReviews = createAction('fetch reviews');
const postReview = createAction('post review');
const deleteReview = createAction('detele review');
const updateReview = createAction('update review');

const actions = {fetchReviews, postReview, deleteReview, updateReview}

const initialState = [];

const reducer = createReducer(initialState, builder =>{
    builder
        .addCase(fetchReviews, (state, action)=>({}))
        .addCase(postReview, (state, action)=>({}))
        .addCase(deleteReview, (state, action)=>({}))
        .addCase(updateReview, (state, action)=>({}))
});

export {reducer, actions}