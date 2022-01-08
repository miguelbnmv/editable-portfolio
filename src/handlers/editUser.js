export const onEditUser = (noteId, noteTitle, noteContent, setData, notes) => {

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;

  const noteToEdit = {
      title: noteTitle,
      content: noteContent,
      date: dateTime
  }

  fetch(`https://editable-portfolio-default-rtdb.europe-west1.firebasedatabase.app/users/${noteId}.json`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(noteToEdit)
  })
  .then(response => response.json())
  .then(data => {

      const noteIndex = notes.findIndex(note => note.id === noteId)
      const updatedData = [...notes];

      updatedData[noteIndex] = {
          ...updatedData[noteIndex],
          ...noteToEdit
      }


      setData(updatedData)
  })
  .catch(err => console.log(err))
}
