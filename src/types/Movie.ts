//export — allows other files to import this type.
//type — creates a type alias.
//Genre — the name of the type.
//| — means “or” in a union type.

export type Genre = "Action" | "Comedy" | "Drama" | "Sci-Fi" | "Thriller"|"Adventure"|"Crime"|"Fantasy"|"Romance"|"Animation";

// The movie interface:An interface defines the structure an object must follow

export interface Movie{
    id: number;
    title:string;
    genre:Genre[]; // union type -Day 4 concept
    year: number;
    rating:number; // 1-10
    watched: boolean;
    poster:string;
    overview:string;
    }

    // For create - we don't need id, user will not give id
    //Omit: is a built-in TypeScript utility type. It creates a new type by removing a property.
    export type CreateMovie = Omit<Movie, "id">;
    // For update - all fields optional
    export type UpdateMovie = Partial<CreateMovie>;