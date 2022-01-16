import "./askquestion.css";

export function Askquestion({ submitanswerhandler }) {
  return (
    <div id="askquestion">
      <h5>Ask a public question!</h5>
      <div className="askqnscontent">
        <form onSubmit={submitanswerhandler}>
          <label htmlFor="title" /> <b>Title</b>
          <br />
          Be specific and imagine you’re asking a question to another person
          <br />
          <input type="text" name="title" id="title" required />
          <br />
          <br />
          <label htmlFor="body" /> <b>Body</b>
          <br />
          Include all the information someone would need to answer your question
          <br />
          <textarea id="body" name="body" rows="25" cols="90" />
          <br />
          <br />
          <label htmlFor="tags" /> <b>Tags</b> 
          <br />
          Add up tags to describe what your question is about
          <br />
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="ex:js,css,html"
            required
          />
          <br />
          <br />
          <button type="submit">submit your question</button>
        </form>
      </div>
    </div>
  );
}
