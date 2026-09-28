# Product Explorer

Browse, search and sort Products from DummyJSON; signed-in users can make temporary changes.

## Language

**Product**:
An item listed by DummyJSON (title, price, stock, category, thumbnail).

**Guest**:
A visitor who is not signed in. Can browse and search Products, but not change them.
_Avoid_: anonymous user, visitor

**Editor**:
A visitor signed in with any Google account. Can add, edit and delete Products as Local edits.
_Avoid_: admin, user

**Local edit**:
An add, edit or delete made by an Editor that lives only in the current browser tab. It is never sent to DummyJSON, is lost on reload, and survives signing out.
_Avoid_: save, update (implies persistence)

## Relationships

- A **Guest** becomes an **Editor** by signing in with Google; signing out makes them a **Guest** again.
- Only an **Editor** can create **Local edits** to **Products**.
