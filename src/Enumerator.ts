export default class CustomEnumerator<T> {
    collection: T[];
    index: number;
    constructor(array:T[]) {
        this.collection = array;
        this.index = 0;
    }
    /**
     * Returns true if the current item is the last one in the collection, or the collection is empty,
     * or the current item is undefined.
     */
     atEnd(): boolean{
         return this.collection[this.index] == undefined || this.collection.length < this.index || this.collection.length == 0;
     }

     /**
      * Returns the current item in the collection
      */
     item(): T {
         return this.collection[this.index];
     }
 
     /**
      * Resets the current item in the collection to the first item. If there are no items in the collection,
      * the current item is set to undefined.
      */
     moveFirst(): void {
         this.index = 0;
     }
 
     /**
      * Moves the current item to the next item in the collection. If the enumerator is at the end of
      * the collection or the collection is empty, the current item is set to undefined.
      */
     moveNext(): void {
         this.index++;
     }

     getNext(): T {
         this.index++;
         return this.item();
     }

     lookAhead(): T {
         return this.collection[this.index + 1]
     }
}