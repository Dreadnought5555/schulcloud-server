'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const courseService = app.service('courses');
const copyCourseService = app.service('courses/copy');
const chai = require('chai');
const expect = chai.expect;

const testUserId = '0000d231816abba584714c9e';
const testCourseExample = '0000dcfbfb5c7a3f00bf21ab';

const testCourse = {
	name: 'testCourse',
	schoolId: '584ad186816abba584714c94',
	userIds: [],
	classIds: [],
	teacherIds: [],
	ltiToolIds: []
};

let courseId = undefined;

describe('courses service', function () {
	it('registered the courses service', () => {
		assert.ok(courseService);
		assert.ok(copyCourseService);
	});

	it('creates a course', () => {
		return courseService.create(testCourse)
			.then(course => {
				courseId = course._id;
				chai.expect(course.name).to.equal(testCourse.name);
				chai.expect(course.userIds).to.have.lengthOf(0);
			});
	});

	it('creates a course copy', () => {
		const newCourseName = "testCourse 76";
		return copyCourseService.create({_id: courseId, name: newCourseName})
			.then(course => {
				chai.expect(course.name).to.equal(newCourseName);
				chai.expect(course.schoolId.toString()).to.equal(testCourse.schoolId);
				chai.expect(course.userIds).to.have.lengthOf(0);
			});
	});

	it('creates a course copy including homeworks', () => {
		const newCourseName = "testCourse 76";
		return copyCourseService.create({_id: testCourseExample, name: newCourseName, userId: testUserId})
			.then(course => {
				chai.expect(course.name).to.equal(newCourseName);
				chai.expect(course.userIds).to.have.lengthOf(0);
			});
	});
});

