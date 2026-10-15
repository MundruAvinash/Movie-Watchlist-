//CRUD stands for:
//C- Create — add data.
//R- Read — retrieve data.
//U- Update — modify data.
//D- Delete — remove data.

export class InMemoryRepository<T extends{id : number}>{
   private items : T[];

   constructor(initialData: T[]= []){
    this.items = [...initialData]
   }
//Returns all records stored in the repository.
   async getAll(): Promise<T[]>{
    return[...this.items];

   }
//Searches for a record with the specified ID.
   async getById(id: number):Promise<T | undefined>{
    return this.items.find(i => i.id === id);
   }
//Creates a new record, assigns it an ID, stores it, and returns it.
   async create(data:Omit<T, "id">):Promise<T>{
    const newItem = {...data, id: Date.now()}as T;
    this.items = [...this.items, newItem];
    return newItem;
   }

//Updates an existing record with the specified ID and returns the updated record, or undefined if the ID doesn't exist.
   async update(id: number, data: Partial<Omit<T, "id">>): Promise<T | undefined> {
    this.items = this.items.map(item =>
      item.id === id ? { ...item, ...data } : item
    );
    return this.getById(id);
  }


}