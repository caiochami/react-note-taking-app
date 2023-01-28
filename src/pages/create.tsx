import { NoteForm } from "../components/NoteForm";

export function Create() {
  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Note
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <NoteForm onSubmit={(event) => console.log(event)} />
    </div>
  );
}
