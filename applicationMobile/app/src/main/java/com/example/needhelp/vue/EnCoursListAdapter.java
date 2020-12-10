package com.example.needhelp.vue;

import android.widget.BaseAdapter;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Demande;

import java.util.ArrayList;

public class EnCoursListAdapter extends BaseAdapter {

    private ArrayList<Demande> lesDemandes;
    private LayoutInflater inflater;
    private Controle controle;
    private Demande demande;
    private AccesDistant accesDistant = new AccesDistant();

    public EnCoursListAdapter(Context context,ArrayList<Demande> lesDemandes){
        this.lesDemandes = lesDemandes;
        this.inflater = LayoutInflater.from(context);
        this.controle = Controle.getInstance(null);
    }

    @Override
    public int getCount() {
        return lesDemandes.size();
    }

    /**
     * retourne l'item de la ligne actuelle
     * @param position
     * @return
     */
    @Override
    public Object getItem(int position) {
        return lesDemandes.get(position);
    }

    /**
     * retourne un indice par rapport à la ligne actuelle
     * @param position
     * @return
     */
    @Override
    public long getItemId(int position) {
        return position;
    }

    /**
     * retourne la ligne formaté avec gestion des évênement
     * @param position
     * @param view
     * @param viewGroup
     * @return
     */
    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {
        // declaration d'un Holder
        ViewHolder holder;
        // si la ligne n'existe pas encore
        if(view==null){
            holder = new ViewHolder();
            // la ligne est construite avec un formatage (inflater) relié à layout_liste_demande
            view = inflater.inflate(R.layout.layout_liste_encours, null);
            // chauqe propriété du holder est relié à une propriété classique
            holder.txtDate = (TextView)view.findViewById(R.id.txtDate);
            holder.txtTitreDemande = (TextView)view.findViewById(R.id.txtTitreDemande);
            holder.btnRefuser = (Button) view.findViewById(R.id.btnRefuserDemande);
            // affecter le holder à la vue
            view.setTag(holder);
        }else{
            // recupération du  holder dans le ligne existante
            holder = (ViewHolder)view.getTag();
        }
        //valorisation du contenu du holder donc de la ligne
        holder.txtTitreDemande.setText(lesDemandes.get(position).getTitreDemande().toString());
        holder.txtDate.setText(lesDemandes.get(position).getDateDemande());
        holder.btnRefuser.setTag(position);
        //Clique sur le bouton pour accepter la demande
        holder.btnRefuser.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                int ligne = (int) v.getTag();
                lesDemandes.get(ligne).setAccepteDemande(1);
                lesDemandes.get(ligne).setAcceptePar(controle.getIdUtilisateur());
                accesDistant.envoi("accepter", lesDemandes.get(ligne).accepterConvertToJSONArray() );
            }
        });
        return view;
    }

    static class ViewHolder{
        Button btnRefuser;
        TextView txtDate;
        TextView txtTitreDemande;
    }
}

