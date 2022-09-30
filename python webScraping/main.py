from audioop import add
from bs4 import BeautifulSoup
import requests
from requests_html import HTMLSession
import pandas as pd
import json

s = HTMLSession()
_name = ["迷客夏","天仁茗茶", "清玉","老虎堂","喜茶 HEYTEA","茶星人","唇茶","享茶","長洲角酪","你妳","花斑茶社","茶湯會","吃茶三千","李圓圓","Comebuytea","幸福堂","不要對我尖叫","我想和你無所事事","我是酸奶君","茶理史"]
name = ["幸福堂 Xing Fu Tang","不要對我尖叫","我想和你無所事事","我是酸奶君","茶理史"]
id = 0
_name = ""
page_url=[]
store_link_array = []
store_detail_array = []

def Main():
    for i in name:
        global page_url,_name
        _name = i
        page_url = ['https://www.openrice.com/zh/hongkong/restaurants?what=' + i ]
        print("Getting Data" + i)
        get_store_detail()

    print("Formatting Data...")
    json_str = json.dumps(store_detail_array, ensure_ascii=False).encode('utf8').decode()
    df = pd.read_json (json_str)
    print("Generating CSV...")
    df.to_csv (r'C:\Users\Administrator\Desktop\Side Project\Milk Tea\python webScraping\store.csv', index = None)
    print(json_str)

def getdata(page_url):
    r = s.get(page_url)
    # r.html.render(sleep=1)
    soup = BeautifulSoup(r.text, 'html.parser')
    return soup

def getnextpage():
    global page_url
    soup = getdata(page_url[0])
    page = soup.find('section' , {"class" : "js-pois-pagination pull-right"})
    while page.find('a' , {"class" : "pagination-button next js-next"}):
        url = 'https://www.openrice.com' + str(page.find('a',{'class' : 'pagination-button next js-next'})['href'])
        page_url.append(url)
        soup = getdata(url)
        page = soup.find('section' , {"class" : "js-pois-pagination pull-right"})
    return page_url

def get_store_detail_link():
    getnextpage()
    for i in page_url:
        file = requests.get(i , headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(file.text, 'lxml')
        store_cards = soup.find_all('div', class_='content-cell-wrapper')
        for store in store_cards:
            store_info = store.h2.a['href'].strip()
            store_link = "https://www.openrice.com/" + store_info
            store_link_array.append(store_link)
    return store_link_array

def get_store_detail():

    get_store_detail_link()
        
    for i in store_link_array:
        file = requests.get(i , headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(file.text, 'lxml')

        try:
            address = soup.find('div' , {"class" : "address-info-section"}).find('div' , {"class" : "content"}).find('a').text
        except:
            pass
        try:
            opening_hour = soup.find('section' , {"class" : "opening-hours-container has-today-opening-hour"}).find("div" , {"class" : "opening-hours-time"}).text
        except:
            pass
        try:
            phone = soup.find("section" , {"class" : "telephone-section"}).find("div" , {"class" : "content"}).text
        except:
            phone = ""
        store_detail = {
            "id"   : (id + 1),
            "name" : _name.strip(),
            "address" : address.strip(),
            "opening_hour" :opening_hour.strip(),
            "phone" : phone.strip()
        }
        store_detail_array.append(store_detail)

Main()






