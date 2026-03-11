const getAllNotes = (req, res) => {
  res.status(200).send('Hello, World!');
};

const changeNote = (req, res) => {
  res.status(201).send({ message: 'Changes made successfully!' });
};

const postNewNote = (req, res) => {
  res.status(201).send({ message: 'Note created successfully!' });
};

const deleteNote = (req, res) => {
  res.status(200).send({ message: 'Note deleted successfully!' });
};

export { getAllNotes , changeNote , postNewNote , deleteNote};