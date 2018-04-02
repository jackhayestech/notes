import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export class Tags extends Component
{
    constructor(props)
    {
        super(props)
        var savedTags = [];
        var tagSuggestions = [];

        this.state = {
            tags: this.loadTags(this.props.noteTags),
            suggestions: this.props.tags,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    loadTags(tagsdata)
    {
        var tags = []
        tagsdata.forEach(tag => {
            tags.push({
                id: tags.length,
                text: tag
            });
        });
        return tags;
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        
        var tagsText = [];

        this.state.tags.forEach((Note) => {
            tagsText.push(Note.text)
        });

        this.props.updateNoteTags(tagsText);
    }

    handleAddition(tag) {
        let tags = this.state.tags;

        tags.push({
            id: tags.length,
            text: tag
        });

        var tagsText = [];

        this.state.tags.forEach((Note) => {
            tagsText.push(Note.text)
        });

        this.setState({tags: tags});
        this.props.updateNoteTags(tagsText);
        this.props.addTag(tag);
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    render()
    {
        const { tags, suggestions } = this.state;

        return(
            <ReactTags
                tags={tags}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag} />
        );
    }
}
