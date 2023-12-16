import {Button, Pagination} from "react-bootstrap";

export const Paginate = ({page, setPage, totalItems, fn}) => {
  return (
    // how to center this?
    // how to make it look better?
    // just do className="d-flex justify-content-center" on the parent div
    <div className={"d-flex justify-content-center"}>
      <Button variant="outline-dark buttons" onClick={async () => {
        setPage(page - 1)
        if (fn) fn()
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 200);
      }}
              disabled={page === 1}>{"<"}
      </Button>
      <div className={"d-flex justify-content-center"}>
        <Button variant={"outline-dark buttons"} disabled>Page {page} of {Math.ceil(totalItems / 10)}</Button>
      </div>
      <Button variant={"outline-dark buttons"} onClick={async () => {
        setPage(page + 1)
        if (fn) fn()
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 200);
      }}
              disabled={totalItems <= page * 10}>{">"}</Button>
    </div>
  )
}
