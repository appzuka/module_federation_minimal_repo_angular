const createStore = () => {

    var memoryData = {};
    var subscribers = {};

    return {
    
      notifySubscribers( storeKey ) {

        if( subscribers[ storeKey ] ) {
          subscribers[storeKey].forEach(fn => fn( memoryData[ storeKey ] ));
        }
      },


      dispatch( storeKey, storeValue ) {
        memoryData[ storeKey ] = storeValue;
        this.notifySubscribers( storeKey );
        console.log( memoryData );
      },      

      test() {

      },

      subscribe( storeKey, fn ) {
        if( !subscribers[ storeKey ] ) {
          subscribers[ storeKey ] = [];
        }

        subscribers[storeKey].push(fn);
      }
    }
  };
  
  const store = createStore();
  
  export default store;