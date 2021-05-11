import { nanoid } from 'nanoid'

class Course {
  constructor(
    id,
    { courseName, category, price, language, email, stack, teachingAssistants }
  ) {
    this.id = id
    this.courseName = courseName
    this.category = category
    this.price = price
    this.language = language
    this.email = email
    this.stack = stack
    this.teachingAssistants = teachingAssistants
  }
}

const courseHolder = {}

const resolvers = {
  getCourse: ({ id }) => {
    return new Course(id, courseHolder[id]) // return key-value pairs
  },
  createCourse: ({ input }) => {
    const id = nanoid()
    courseHolder[id] = input

    return new Course(id, input)
  },
}

export default resolvers
