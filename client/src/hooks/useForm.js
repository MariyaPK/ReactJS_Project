import { useState } from "react";

const validateForm = (values) => {
  let errors = {};

  const imageUrlPattern = /^https?:\/\//;

  if (!values.title) {
    errors.title = "Title is required";
  } else if (values.title.length < 3 || values.title.length > 30) {
    errors.title = "Title must be between 3 and 30 characters";
  }

  if (!values.isbn) {
    errors.isbn = "ISBN is required";
  } else if (values.isbn.length !== 13) {
    errors.isbn = "ISBN must be 13 characters";
  }

  if (!values.imageUrl) {
    errors.imageUrl = "Cover is required";
  } else if (!imageUrlPattern.test(values.imageUrl)) {
    errors.imageUrl = "Invalid URL!";
  }

  if (!values.author) {
    errors.author = "Author is required";
  } else if (values.author.length < 3 || values.author.length > 30) {
    errors.author = "Author must be between 3 and 30 characters";
  }

  if (!values.summary) {
    errors.summary = "Description is required";
  } else if (values.summary.length < 3 || values.summary.length > 1500) {
    errors.summary = "Summary must be between 3 and 1500 characters";
  }

  if (!values.publishYear) {
    errors.publishYear = "Publish year is required";
  } else if (values.publishYear.length !== 4) {
    errors.publishYear = "Publish year must be a four-digit number";
  }

  if (!Object.values(values.genre).some((isSelected) => isSelected)) {
    errors.genre = "Please select at least one genre";
  }

  return errors;
};

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmitHandler(values);
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      console.error("Error in form:", error);
    }
  };

  const changeValues = (newValues) => {
    setValues(newValues);
    setErrors({});
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
    errors,
    changeHandler,
    onSubmit,
    changeValues,
    handleCheckboxChange,
  };
};
