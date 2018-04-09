import scrapy


class StructuredEmails(scrapy.Spider):
    name = "structured-emails"
    start_urls = [
        'http://localhost:8000/',
    ]

    def parse(self, response):
        for comment in response.css('div.cmmnt-content'):
            yield {
                'emails': comment.css('a[href^="mailto"]::text').extract(),
                'username': comment.css('a.userlink::text').extract_first()
                # and so on...
            }

class EmailList(scrapy.Spider):
    name = "email-list"
    start_urls = [
        'http://localhost:8000/',
    ]

    def parse(self, response):
        yield {
            'emails': response.css('div#container').xpath('//a[contains(@href, "mailto")]/text()').extract()
        }