"use client";

import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { CreateNoteData, NoteTag } from "@/types/note";

import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();

  const handleCancel = () => router.back();

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData);

    const noteData: CreateNoteData = {
      title: values.title as string,
      content: values.content as string,
      tag: values.tag as NoteTag,
    };

    await createNote(noteData);

    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue="Todo">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
