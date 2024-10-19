// app.js
const App = () => {
  const [newStory, setNewStory] = React.useState("");
  const [newName, setNewName] = React.useState(""); // New state for poster's name
  const [events] = React.useState(["Meeting at 10 AM", "Project Demo at 2 PM"]);
  const [contacts, setContacts] = React.useState([
    { name: "Alice", pic: "https://picsum.photos/40/40?random=1" },
    { name: "Bob", pic: "https://picsum.photos/40/40?random=2" },
    { name: "Charlie", pic: "https://picsum.photos/40/40?random=3" }
  ]);
  const [projects, setProjects] = React.useState(["Project A", "Project B"]);
  const [albums, setAlbums] = React.useState(["Album 1", "Album 2"]);
  const [organisations] = React.useState(["Org 1", "Org 2"]);
  const [followers] = React.useState(["John", "Doe"]);
  const [followingList] = React.useState(["User1", "User2"]);
  const [filters] = React.useState(["All", "Updates", "Photos", "Events"]);
  const [stories, setStories] = React.useState([
    { 
      title: "My first story", 
      content: "Content of the first story", 
      postedBy: "User1", 
      timestamp: new Date().toLocaleString(), 
      comments: [], 
      likesCount: 0, 
      likedBy: [],
      pic: "https://picsum.photos/600/300?random=1"
    },
    { 
      title: "My second story", 
      content: "Content of the second story", 
      postedBy: "User2", 
      timestamp: new Date().toLocaleString(), 
      comments: [], 
      likesCount: 0, 
      likedBy: [],
      pic: "https://picsum.photos/600/300?random=2"
    }
  ]);
  const [tasks] = React.useState(["Complete report", "Attend meeting", "Submit assignment"]);
  const [progressItems] = React.useState([
    { name: "Progress 1", percent: 50 },
    { name: "Progress 2", percent: 80 },
  ]);

  const addStory = () => {
    if (newStory.length < 3) {
      alert("Story must be at least 3 characters long!");
      return;
    }
    if (newName.length < 1) {
      alert("Name must be provided!");
      return;
    }
    const timestamp = new Date().toLocaleString();
    setStories([...stories, { 
      title: newStory, 
      content: "", 
      postedBy: newName, 
      timestamp, 
      comments: [], 
      likesCount: 0, 
      likedBy: [], 
      pic: "https://picsum.photos/600/300?random=" + (stories.length + 3) 
    }]);
    setNewStory("");
    setNewName(""); // Reset name input
  };

  const deleteStory = (index) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const addComment = (index) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      const updatedStories = [...stories];
      updatedStories[index].comments.push(comment);
      setStories(updatedStories);
    }
  };

  const toggleLike = (index) => {
    const updatedStories = [...stories];
    const user = newName; // Use the name as the identifier for simplicity
    const likedBy = updatedStories[index].likedBy;

    // Check if the user has already liked this story
    if (likedBy.includes(user)) {
      // If already liked, decrement likes count and remove user from likedBy
      updatedStories[index].likesCount -= 1;
      updatedStories[index].likedBy = likedBy.filter(name => name !== user);
    } else {
      // If not liked yet, increment likes count and add user to likedBy
      updatedStories[index].likesCount += 1;
      updatedStories[index].likedBy.push(user);
    }

    setStories(updatedStories);
  };

  const addContact = () => {
    const name = prompt("Enter contact name:");
    if (name) {
      const pic = `https://picsum.photos/40/40?random=${contacts.length + 1}`;
      setContacts([...contacts, { name, pic }]);
    }
  };

  const addProject = () => {
    const name = prompt("Enter project name:");
    if (name) setProjects([...projects, name]);
  };

  const addAlbum = () => {
    const name = prompt("Enter album name:");
    if (name) setAlbums([...albums, name]);
  };

  return (
    <div id="app">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <div className="dropdown me-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              My Apps
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">App 1</a></li>
              <li><a className="dropdown-item" href="#">App 2</a></li>
              <li><a className="dropdown-item" href="#">App 3</a></li>
            </ul>
          </div>
          <a className="navbar-brand" href="#">Home</a>
          <a className="navbar-brand" href="#">Explore</a>
          <form className="d-flex ms-auto">
            <input className="form-control me-2" type="search" placeholder="Search for contacts" aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-3">
            {/* Upcoming Events */}
            <div className="card mb-3">
              <h5 className="card-header">Upcoming Events</h5>
              <ul className="list-group list-group-flush">
                {events.map((event, index) => <li key={index} className="list-group-item">{event}</li>)}
              </ul>
            </div>

            {/* Contacts */}
            
<div className="card mb-3">
  <h5 className="card-header">Contact Shortcuts</h5>
  <ul className="list-group list-group-flush">
    {contacts.map((contact, index) => (
      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
        <img src={contact.pic} alt={`${contact.name} profile`} className="rounded-circle me-2" style={{ width: "40px", height: "40px" }} />
        {contact.name}
      </li>
    ))}
  </ul>
  <button onClick={addContact} className="btn btn-outline-primary w-100">Add Contact</button>
</div>

{/*Projects Section*/}
<div className="card mb-3">
  <h5 className="card-header">Project Shortcuts</h5>
  <ul className="list-group list-group-flush">
    {projects.map((project, index) => (
      <li key={index} className="list-group-item">{project}</li>
    ))}
  </ul>
  <button onClick={addProject} className="btn btn-outline-primary w-100">Add Project</button>
</div>
{/*Albums*/}
<div className="card mb-3">
  <h5 className="card-header">Album Shortcuts</h5>
  <ul className="list-group list-group-flush">
    {albums.map((album, index) => (
      <li key={index} className="list-group-item">{album}</li>
    ))}
  </ul>
  <button onClick={addAlbum} className="btn btn-outline-primary w-100">Add Album</button>
</div>


            {/* Organisations */}
            <div className="card mb-3">
              <h5 className="card-header">Organisations</h5>
              <ul className="list-group list-group-flush">
                {organisations.map((org, index) => (
                  <li key={index} className="list-group-item">{org}</li>
                ))}
              </ul>
            </div>

            {/* Followers */}
            <div className="card mb-3">
              <h5 className="card-header">Followers</h5>
              <ul className="list-group list-group-flush">
                {followers.map((follower, index) => (
                  <li key={index} className="list-group-item">{follower}</li>
                ))}
              </ul>
            </div>

            {/* Following List */}
            <div className="card mb-3">
              <h5 className="card-header">Following</h5>
              <ul className="list-group list-group-flush">
                {followingList.map((follower, index) => (
                  <li key={index} className="list-group-item">{follower}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Column */}
          <div className="col-md-6">
            {/* Add New Story */}
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="What's your story?" 
                value={newStory} 
                onChange={(e) => setNewStory(e.target.value)} 
              />
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Your Name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
              />
              <button className="btn btn-primary" onClick={addStory}>Add Story</button>
            </div>

            {/* Stories */}
            <div className="stories">
              {stories.map((story, index) => (
                <div key={index} className="card mb-3 shadow-sm">
                  <img src={story.pic} className="card-img-top" alt={story.title} />
                  <div className="card-body">
                    <h5 className="card-title">{story.title}</h5>
                    <p className="card-text">{story.content}</p>
                    <p className="card-text"><small className="text-muted">Posted by {story.postedBy} on {story.timestamp}</small></p>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteStory(index)}>Delete</button>
                    <button className="btn btn-secondary btn-sm ms-2" onClick={() => addComment(index)}>Comment</button>
                    <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => toggleLike(index)}>
                      {story.likedBy.includes(newName) ? 'Unlike' : 'Like'} ({story.likesCount})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-3">
            {/* Filters */}
            <div className="card mb-3">
              <h5 className="card-header">Filters</h5>
              <ul className="list-group list-group-flush">
                {filters.map((filter, index) => (
                  <li key={index} className="list-group-item">{filter}</li>
                ))}
              </ul>
            </div>

            {/* Tasks */}
            <div className="card mb-3">
              <h5 className="card-header">Tasks</h5>
              <ul className="list-group list-group-flush">
                {tasks.map((task, index) => (
                  <li key={index} className="list-group-item">{task}</li>
                ))}
              </ul>
            </div>

            {/* Progress Items */}
            <div className="card mb-3">
              <h5 className="card-header">Progress</h5>
              <ul className="list-group list-group-flush">
                {progressItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name}
                    <div className="progress" style={{ width: "60%" }}>
                      <div className="progress-bar" role="progressbar" style={{ width: `${item.percent}%` }} aria-valuenow={item.percent} aria-valuemin="0" aria-valuemax="100">{item.percent}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
