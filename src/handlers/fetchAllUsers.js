export const onFetchAllNotes = async (userId, setData, userToken) => {
  await fetch(`https://react-demo-6bec1-default-rtdb.europe-west1.firebasedatabase.app/notes.json?auth=${userToken}&orderBy="user"&equalTo="${userId}"`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {

      const fetchedNotes = [];
      for( let key in data) {
          fetchedNotes.push({
              ...data[key],
              id: key
          });
      }
      setData(fetchedNotes);
  })
  .catch(err => console.log(err))
}
