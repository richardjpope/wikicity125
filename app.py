from flask import Flask, request, redirect, render_template
import jinja2
import urllib2
import os

app = Flask(__name__)
app.debug = True

@app.route("/go")
def go():
    mode = request.args.get('mode', 'start')
    if not mode in ('example', 'run'):
        mode = 'run'
    return render_template('index.html', mode=mode)

@app.route("/")
def start():
    return render_template('start.html')

@app.route("/about")
def about():
    return render_template('about.html')
            
@app.route("/browser/<int:wikipedia_id>")
def browser(wikipedia_id):
    return render_template('browser.html', wikipedia_id=wikipedia_id)
    
@app.route('/articles/<lat>/<lng>')
def articles(lat, lng):
    url = 'http://api.wikilocation.org/articles?lat=%s&lng=%s&limit=3&radius=4000&format=json&locale=en' % (lat, lng)
    print url
    return urllib2.urlopen(url).read()
    
if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
