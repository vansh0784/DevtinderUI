# Redux learnings
1. install react-redux @reactjs/toolkit from npm registry
2. configure the store and add reducer
3. put all the app code inside the provider (React-redux) and in the provider tag pass the store as prop
4. and then create a slice for the store --> using a createSlice api --> name:Slice + initialValue:of slice + reducers:{
    reducer1,reducer2 .. each reducer have an state and actions corresponding to themselves
}
5. export all the actions --> basically all the things which are made in the reducers object and export the reducer .. it is reducer not reducers

6. Atlast, import it in the store

# Note Important --> In react we use the dispatch for make changes in the store and to read the data fromt he store we use selectors