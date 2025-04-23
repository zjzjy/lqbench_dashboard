"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Send, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: formState.name.trim() === "" ? "Name is required" : "",
      email:
        formState.email.trim() === ""
          ? "Email is required"
          : !validateEmail(formState.email)
            ? "Invalid email address"
            : "",
      message: formState.message.trim() === "" ? "Message is required" : "",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return
    }

    // Submit form
    setIsSubmitting(true)
    setSubmitError("")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-dark-accent">Contact Us</h1>
              <p className="text-gray-500 mt-1">Get in touch with the LQ-Bench research team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="md:col-span-1 space-y-6">
                <Card className="bg-white rounded-2xl border-0 shadow-card overflow-hidden">
                  <CardHeader className="bg-yellow-accent pb-6">
                    <CardTitle className="text-dark-accent">Contact Information</CardTitle>
                    <CardDescription className="text-dark-accent/70">
                      Reach out to us with any questions or feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-dark-accent mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <Link
                            href="mailto:contact@lq-bench.org"
                            className="text-sm text-gray-600 hover:text-dark-accent"
                          >
                            contact@lq-bench.org
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-dark-accent mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Location</p>
                          <p className="text-sm text-gray-600">
                            Department of Psychology
                            <br />
                            University Research Center
                            <br />
                            123 Academic Avenue
                            <br />
                            Research City, RC 12345
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white rounded-2xl border-0 shadow-card p-6">
                  <h3 className="text-lg font-semibold text-dark-accent mb-3">Join Our Research</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Interested in contributing to our research on emotional intelligence in LLMs? We're always looking
                    for collaborators.
                  </p>
                  <Link href="mailto:research@lq-bench.org">
                    <Button className="w-full bg-dark-accent text-white hover:bg-dark-accent-light">
                      Contact Research Team
                    </Button>
                  </Link>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card className="bg-white rounded-2xl border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-dark-accent">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800">Message sent successfully!</p>
                          <p className="text-sm text-green-700 mt-1">
                            Thank you for contacting us. We'll respond to your message as soon as possible.
                          </p>
                        </div>
                      </div>
                    ) : submitError ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Error sending message</p>
                          <p className="text-sm text-red-700 mt-1">{submitError}</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${
                                errors.name ? "border-red-300" : "border-gray-300"
                              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow focus:border-transparent`}
                              placeholder="Your name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              className={`w-full px-3 py-2 border ${
                                errors.email ? "border-red-300" : "border-gray-300"
                              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow focus:border-transparent`}
                              placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow focus:border-transparent"
                            placeholder="What is this regarding?"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full px-3 py-2 border ${
                              errors.message ? "border-red-300" : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow focus:border-transparent`}
                            placeholder="Your message here..."
                          ></textarea>
                          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        </div>

                        <div>
                          <Button
                            type="submit"
                            className="w-full bg-dark-accent text-white hover:bg-dark-accent-light flex items-center justify-center gap-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Send Message</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <Card className="bg-white rounded-2xl border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-dark-accent">Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about contacting the LQ-Bench team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-dark-accent mb-2">
                      How quickly can I expect a response?
                    </h3>
                    <p className="text-sm text-gray-600">
                      We typically respond to inquiries within 2-3 business days. For urgent matters, please indicate
                      this in your subject line.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-dark-accent mb-2">
                      Can I contribute to the benchmark?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Yes! We welcome contributions from researchers and practitioners in the fields of AI and
                      psychology. Please reach out with details about your expertise and how you'd like to contribute.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-dark-accent mb-2">
                      Is the benchmark methodology available for review?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Yes, you can find detailed information about our methodology on the{" "}
                      <Link href="/methodology" className="text-dark-accent hover:underline">
                        Methodology
                      </Link>{" "}
                      page. For specific questions not covered there, please contact us.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
