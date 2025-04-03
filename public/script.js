document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const bookList = document.getElementById("bookList");

    async function fetchBooks() {
        bookList.innerHTML = "";
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                window.location.href = 'login.html';
                return;
            }

            const response = await fetch("http://localhost:3000/livres", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des livres');
            }

            const books = await response.json();

            if (!Array.isArray(books)) {
                throw new Error('Format de données invalide');
            }

            books.forEach(book => {
                const li = document.createElement("li");
                li.classList.add("note");
                li.innerHTML = `
                    <div>
                        <h3>${book.titre}</h3>
                        <p><strong>Auteur :</strong> ${book.auteur}</p>
                        <p><strong>Description :</strong> ${book.description || "Aucune description"}</p>
                        <p><strong>Année :</strong> ${book.anneePublication || "Non précisée"}</p>
                    </div>
                    <div>
                        <button onclick="editBook('${book._id}', 
                                                  \`${encodeURIComponent(book.titre)}\`, 
                                                  \`${encodeURIComponent(book.auteur)}\`, 
                                                  \`${encodeURIComponent(book.description || "")}\`, 
                                                  '${book.anneePublication || ""}')">✏️</button>
                        <button onclick="deleteBook('${book._id}')">❌</button>
                    </div>
                `;
                bookList.appendChild(li);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des livres", error);
            if (error.message.includes('Token')) {
                window.location.href = 'login.html';
            }
        }
    }


    window.editBook = (id, titre, auteur, description, anneePublication) => {
        document.getElementById("title").value = decodeURIComponent(titre);
        document.getElementById("author").value = decodeURIComponent(auteur);
        document.getElementById("description").value = decodeURIComponent(description);
        document.getElementById("year").value = anneePublication;


        const submitButton = document.querySelector("#bookForm button");
        submitButton.textContent = "Modifier";
        submitButton.dataset.editingId = id;
    };

    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const description = document.getElementById("description").value;
        const year = document.getElementById("year").value;

        const submitButton = e.target.querySelector("button");
        const editingId = submitButton.dataset.editingId;

        const bookData = {
            titre: title,
            auteur: author,
            description: description,
            anneePublication: year ? parseInt(year) : undefined
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = 'login.html';
                return;
            }
            
            if (editingId) {
                await fetch(`http://localhost:3000/livres/${editingId}`, {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });


                submitButton.textContent = "Ajouter";
                delete submitButton.dataset.editingId;
            } else {

                await fetch("http://localhost:3000/livres", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData)
                });
            }

            bookForm.reset();
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification du livre", error);
        }
    });

    window.deleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = 'login.html';
                return;
            }

            await fetch(`http://localhost:3000/livres/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de la suppression du livre", error);
        }
    };

    fetchBooks();
});
