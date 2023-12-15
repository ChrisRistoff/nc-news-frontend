import {Button} from "react-bootstrap";

export const Paginate = ({page, setPage, totalItems, fn}) => {
  return (
    <div>
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
              disabled={page === 1}>{"<"} Previous Page
      </Button>
      <p>Page {page} of {Math.ceil(totalItems / 10)}</p>
      <Button variant="outline-dark buttons" onClick={async () => {
        setPage(page + 1)
        if (fn) fn()
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 200);
      }}
              disabled={totalItems <= page * 10}>Next Page{">"}</Button>
    </div>
  )
}
