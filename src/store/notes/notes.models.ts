export type NotesObj = {
  [id: string]: NoteObj;
};

export type NoteObj = {
  id: string;
  text: string;
  date: number;
  tags?: string[];
  isStarred?: boolean;
  isArchived?: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
};
