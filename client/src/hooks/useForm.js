import { useState, useEffect } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onSubmitHandler(values);

    setValues(initialValues);
  };

  const changeValues = (newValues) => {
    // TODO: Validate newValues shape (like initialValues)

    setValues(newValues);
  };

  const handleCheckboxChange = (genre) => {
    setValues((book) => {
      const isSelected = book.genre.includes(genre);
      if (isSelected) {
        return { ...book, genre: book.genre.filter((selectedGenre) => selectedGenre !== genre) };
      } else {
        return { ...book, genre: [...book.genre, genre] };
      }
    });
  };

  return {
    values,
    changeHandler,
    onSubmit,
    changeValues,
    handleCheckboxChange,
  };
};
