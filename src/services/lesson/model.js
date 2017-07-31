'use strict';

// model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
	name: { type: String },
	description: { type: String },
	date: { type: Date },
	time: { type: Date },
	contents: [{
		component: { type: String },
		title: { type: String },
		content: {},
		hidden: { type: Boolean }
	}],
	materialIds: [{ type: Schema.Types.ObjectId, ref: 'material' }],
	courseId: { type: Schema.Types.ObjectId, required: true, ref: 'course' },
	hidden: { type: Boolean },
	shareToken: { type: String, unique: true }, // token for topic sharing
	originalTopic: { type: Schema.Types.ObjectId, ref: 'topic' } // if current topic was copied from another, for later fancy stuff
},{
	timestamps: true
});

const lessonModel = mongoose.model('lesson', lessonSchema);

module.exports = lessonModel;
