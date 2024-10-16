const { request, response } = require('express');
const knex = require('../database/knex')

class NotesController{
    async create(request, response){
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        const {note_id} = await knex("notes").insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: links
            }
        });

        await knex('links').insert(linksInsert);

        
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex('tags').insert(tagsInsert);

        response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name")
        const links = await knex("links").where({ note_id: id }).orderBy("created_at")

        return response.json({
            ...note,
            tags,
            links
        });
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const { user_id } = require.body;

        let notes;
        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex("tags").whereIn("name", filterTags);
        }else{
            notes = await knex("notes").where({ user_id }).whereLike( "title", `%${title}%`).orderBy("title");
        }

        return response.json();
    }
}

module.exports = NotesController